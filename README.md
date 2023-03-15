# soutenance

![flask](https://user-images.githubusercontent.com/66678204/225342042-29f90d3d-2d81-46f5-82b7-e0f2ff10aca4.png)

### Ce qu'il faut faire c'est installer les dependances avec pip 
$ cd Backend_Python

$ python3 -m venv nom_env

$ source nom_env/bin/activate

$ pip3 install -r requirements.txt

### ![ELK](https://user-images.githubusercontent.com/66678204/225342527-b7458c58-b5e3-4edb-b753-9c04fe5ee542.png)

$ cd ELK

$ docker-compose up

# PostgreSQL

### Generer des données dans la bases Postgresql

$ python3 charger.py


## Pour des besoins d'automatisations 

### ![Airflow](https://user-images.githubusercontent.com/66678204/225342708-207d479f-9f9f-43a8-b7af-6008dacbe9bb.png)

$ mkdir airflow

$ cd airflow && python3 -m venv airflow | source airflow/bin/activate

$ pip install apache-airflow[mysql]

$ airflow db init

$ airflow webserver -p [port:port]

$ airflow scheduler

### Faire son prémier DAG pour planifier les tâches
$ mkdir /home/nom_user/airflow/dags

$ touch main.py

plus details : https://github.com/Babou246/Airflow.git
