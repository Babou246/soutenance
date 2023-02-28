from elasticsearch import Elasticsearch


def es():
    es = Elasticsearch([{'host': 'localhost', 'port': 9200,'scheme':'http'}])
    return es