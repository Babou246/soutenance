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
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dash/data')
def apii():
    return api()


@app.route('/dash')
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
    # print(d)
    # Déterminez le nombre de résultats par page
    resultats_par_page = 10

    # Récupérez le numéro de page à partir des arguments de requête
    page = request.args.get('page', 1, type=int)

    # Calculez l'indice de début et l'indice de fin pour la pagination
    debut = (page - 1) * resultats_par_page
    fin = debut + resultats_par_page

    # Créez une liste de résultats pour la page actuelle
    resultat_page = d[debut:fin]

    # Calculez le nombre total de pages
    nombre_pages = len(d) // resultats_par_page + (len(d) % resultats_par_page > 0)

    # Renvoyez le template avec les données de la page actuelle et les informations de pagination
    return render_template('dash.html', resultat_page=resultat_page, nombre_pages=nombre_pages, page=page,data=d)



if __name__=='__main__':
    app.run(debug=True,port=5000)