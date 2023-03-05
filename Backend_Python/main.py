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
@app.route('/pipe', methods=["GET", "POST"])
def pipe():
    data = request.form.get("data")
    payload = {}
    headers= {}
    url = "http://127.0.0.1:9200/autocomplete?query="+str(data)
    response = requests.request("GET", url, headers=headers, data = payload)
    return response.json()


@app.route('/index',methods=['GET','POST'])
def index():
    return render_template('index.html')


@app.route('/dash/data')
def apii():
    return api()


@app.route('/')
def dash():
    count = get_items('Article')
    count1 = get_items('Client')
    chiffre = get_items('Chiffre d\'affaire')
    benefice = get_items('Bénéfice')
    entiers = data_to_float(chiffre)
    benefices = data_to_float(benefice)
    c = around(entiers)
    b = around(benefices)
    unique = delete_double_items(count)
    unique1 = delete_double_items(count1)
    unique=len(unique)
    client=len(unique1)
    d = datas()
    return render_template('dashboard.html',count=count,unique=unique,client=client,c=c,b=b,data=d)

@app.route('/select')
def select():
    res = es.search(index='excel-data', body={'query': {'match_all': {}},'size':10000})
    hits = res['hits']['hits']
    d = [
        {'Benefice': hit['_source']['Bénéfice'], 
        'Commerce': hit['_source']['Commercial'],
        'Quantité': hit['_source']['Quantité'],
        'Ville': hit['_source']['Ville'],
        'Client': hit['_source']['Client'],
        'Article': hit['_source']['Article'],
        'Date': hit['_source']['Date de commande'],
        'Chiffre': hit['_source']['Chiffre d\'affaire']
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