from flask import Flask,render_template,url_for,jsonify
from elasticsearch import Elasticsearch

app = Flask(__name__)

try:
    # Configurer la connexion à Elasticsearch
    es = Elasticsearch([{'host': 'localhost', 'port': 9200,'scheme':'http'}])
except Exception as e:
    print(e, 'Veuillez connecter votre serveur ELASTIC')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dash/data')
def get_data():
    # Récupérer les données Elasticsearch
    res = es.search(index='excel-data', body={'query': {'match_all': {}},'size':10000})
    hits = res['hits']['hits']
    data = [
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

    return jsonify(data)


@app.route('/dash')
def dash():
    # requête pour récupérer les données
    query = {
        "query": {
            "match_all": {}
        }
    }
    res = es.search(index='excel-data', body=query, size=10000)
    
    # extraction des résultats
    count = res['hits']['total']['value']
    hits = res['hits']['hits']
    count = [hits[i]['_source']['Article'] for i in range(len(hits)-1)]
    print(count)
    count1 = [hits[i]['_source']['Client'] for i in range(len(hits)-1)]
    chiffre = [hits[i]['_source']['Chiffre d\'affaire'] for i in range(len(hits)-1)]
    benefice = [hits[i]['_source']['Bénéfice'] for i in range(len(hits)-1)]
    entiers = list(map(float, map(float,map(float, [x.replace(',', '.') for x in chiffre]))))
    benefices = list(map(float, map(float,map(float, [x.replace(',', '.') for x in benefice]))))
    c = round(sum(entiers),2)
    b = round(sum(benefices),2)


    unique = list(dict.fromkeys(count))
    unique1 = list(dict.fromkeys(count1))
    unique=len(unique)
    client=len(unique1)
    return render_template('dashboard.html',count=count,unique=unique,client=client,c=c,b=b)

@app.route('/select')
def select():
    
    return render_template('dash.html')


if __name__=='__main__':
    app.run(debug=True,port=5000)