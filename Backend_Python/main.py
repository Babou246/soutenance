# IMPORTATION DES BIBLIOTEQUES
from flask import Flask,render_template,url_for,jsonify,request
from utils import *
from cluster import *
import sys
sys.setrecursionlimit(10000)

# INSTANCE
app = Flask(__name__)
es = es()

# ROUTES
@app.route('/index', methods=["GET", "POST"])
def pipe():
    data = request.form.get("data")
    # payload = {}
    # headers= {}
    # url = "http://127.0.0.1:9200/autocomplete?query="+str(data)
    # response = requests.request("GET", url, headers=headers, data = payload)
    # return response.json()
    res = es.search(index='data-babou', body={"track_total_hits": "true","query":{ "bool": {"must": [{"match_phrase_prefix": {"nom": {"query": '{}'}}}],"filter": [],"should": [],"must_not":[] }},"aggs": {"auto_complete": {"terms": {"field": "nom.keyword","order": {"_count": "desc"},"size": 25}}}}).format(data)
    hits = res['hits']['hits']
    d = [
        {'Benefice': hit['_source']['benefice'], 
        'nom': hit['_source']['nom'],
        'quantite': hit['_source']['quantite'],
        'pays': hit['_source']['pays'],
        'produit': hit['_source']['produit'],
        'prix_unitaire': hit['_source']['prix_unitaire'],
        'date': hit['_source']['date'],
        'sexe': hit['_source']['sexe']
        }
        for hit in hits]
    return render_template('index.html',datas=d)


@app.route('/index',methods=['GET','POST'])
def index():
    return render_template('index.html')


@app.route('/dash/data')
def apii():
    return api()


@app.route('/')
def dash():
    count = get_items('produit')
    q = get_items('quantite')
    p = get_items('prix_unitaire')
    count1 = get_items('nom')
    conver_q= list(map(float, q))

    result = [conver_q[i] * p[i] for i in range(len(conver_q))]
        

    benefices = get_items('benefice')
    c = sum(result)

    b = around(benefices)
    unique = delete_double_items(count)
    unique1 = delete_double_items(count1)
    unique=len(unique)
    client=len(unique1)
    d = datas()
    return render_template('dashboard.html',count=count,c=c,unique=unique,client=client,b=b,data=d)


@app.route('/select')
def select():
    res = es.search(index='data-babou', body={"track_total_hits": 'true','query': {'match_all': {}}})
    hits = res['hits']['hits']
    d = [
        {'Benefice': hit['_source']['benefice'], 
        'nom': hit['_source']['nom'],
        'quantite': hit['_source']['quantite'],
        'pays': hit['_source']['pays'],
        'produit': hit['_source']['produit'],
        'prix_unitaire': hit['_source']['prix_unitaire'],
        'date': hit['_source']['date'],
        'sexe': hit['_source']['sexe']
        }
        for hit in hits]
    return render_template('dash.html',data=d)

@app.route("/search")
def search_autocomplete():
    query = request.args["q"].lower()
    tokens = query.split(" ")
    MAX_SIZE = 5
    clauses = [
        {
            "span_multi": {
                "match": {"fuzzy": {"Client": {"value": i, "fuzziness": "AUTO"}}}
            }
        }
        for i in tokens
    ]

    payload = {
        "bool": {
            "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
        }
    }

    resp = es.search(index="excel-data", query=payload, size=MAX_SIZE)
    return [result['_source']['Client'] for result in resp['hits']['hits']]







if __name__=='__main__':
    app.run(debug=True,port=5000)