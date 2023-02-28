from cluster import *
from flask import jsonify

es = es()

# FUNCTIONS
def get_items(items):
    # requête pour récupérer les données
    # es = es()
    query = {
        "query": {
            "match_all": {}
        }
    }
    res = es.search(index='excel-data', body=query, size=10000)
    
    # extraction des résultats
    count = res['hits']['total']['value']
    hits = res['hits']['hits']
    return [hits[i]['_source'][items] for i in range(len(hits)-1)]


def data_to_float(items):
    return list(map(float, map(float,map(float, [x.replace(',', '.') for x in items]))))
    


def delete_double_items(items):
    return list(dict.fromkeys(items))


def api():
    # es = es()
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

def datas():
    # es = es()
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
    return data

def around(items):
    return round(sum(items),2)


def import_quel(Champs1):
    res = es.search(index='excel-data', body={'query': {'match_all': {}},'size':10000})
    hits = res['hits']['hits']

    data = [
        {'Champs1': hit['_source']["{}".format(Champs1)]} for hit in hits]

    return data

print(import_quel("Article"))