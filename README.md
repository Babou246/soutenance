# soutenance

### 1erement ce qu'il faut faire c'est installer les dependances avec pip 
$ cd Backend_Python

$ python3 -m venv nom_env

$ source nom_env/bin/activate

$ pip3 install -r requirements.txt

### 2ement se placer sur le repertoire ELK
$ cd ELK

$ docker-compose up


## Pour des besoins d'automatisations 
### Installer Airflow
$ mkdir airflow

$ cd airflow && python3 -m venv airflow | source airflow/bin/activate

$ pip install apache-airflow[mysql]

$ airflow db init

$ airflow webserver -p [port:port]

$ airflow scheduler

### Faire son prémier DAG pour planifier les tâches
$ mkdir /home/nom_user/airflow/dags

$ touch main.py
