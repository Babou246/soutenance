from cluster import *
from flask import jsonify,request

es = es()

# FUNCTIONS
def get_items(items):
    # requête pour récupérer les données
    query = {
        "track_total_hits": "true",
        "query": {
            "match_all": {}
        }
    }
    res = es.search(index='data-babou', body=query)
    
    # extraction des résultats
    count = res['hits']['total']['value']
    hits = res['hits']['hits']
    return [hits[i]['_source'][items] for i in range(len(hits)-1)]

def Count(index):
    query = {
        "track_total_hits": "true",
        "query": {
            "match_all": {}
        }
    }
    res = es.search(index=index, body=query)
    
    # extraction des résultats
    return res['hits']['hits']['_count']



def data_to_float(items):
    return list(map(float, map(float,map(float, [x.replace(',', '.') for x in items]))))
    


def delete_double_items(items):
    return list(dict.fromkeys(items))


def api():
    # es = es()
    res = es.search(index='data-babou', body={"track_total_hits": 'true','query': {'match_all': {}}})
    hits = res['hits']['hits']
    data = [
        {'benefice': hit['_source'].get('benefice'), 
        'nom': hit['_source'].get('nom'),
        'quantite': hit['_source'].get('quantite'),
        'pays': hit['_source'].get('pays'),
        'produit': hit['_source'].get('produit'),
        'prix_unitaire': hit['_source'].get('prix_unitaire'),
        'date': hit['_source'].get('date'),
        'sexe': hit['_source'].get('sexe')
        }
        for hit in hits]

    return jsonify(data)


def datas():
    # es = es()
    res = es.search(index='excel-data', body={"track_total_hits": 'true','query': {'match_all': {}}})
    hits = res['hits']['hits']
    data = [
        {'benefice': hit['_source'].get('benefice'), 
        'nom': hit['_source'].get('nom'),
        'quantite': hit['_source'].get('quantite'),
        'pays': hit['_source'].get('pays'),
        'produit': hit['_source'].get('produit'),
        'prix_unitaire': hit['_source'].get('prix_unitaire'),
        'date': hit['_source'].get('date'),
        'sexe': hit['_source'].get('sexe')
        }
        for hit in hits]
    return data

# print(datas())

def around(items):
    return round(sum(items),2)


def import_quel(Champs1):
    res = es.search(index='data-babou', body={"track_total_hits": 'true','query': {'match_all': {}}})
    hits = res['hits']['hits']

    data = [
        {'Champs1': hit['_source']["{}".format(Champs1)]} for hit in hits]

    return data

def get_data():
    res = es.search(index='data-babou', body={'query': {"match_phrase_prefix": {"Client": "d"}}})
    hits = res['hits']['hits']
    data = [
        {'items': hit['_source']
        }
        for hit in hits]
    return data

# print(get_data())