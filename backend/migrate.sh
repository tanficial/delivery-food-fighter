export FLASK_APP=delivery_app.app
export FLASK_ENV=production
export DB_USER=root
export DB_HOST=localhost
export DB_PASSWORD=[]
export DB_NAME=delivery
# python -c "import os; print(os.urandom(16))"
export SECRET_KEY=[]

flask db init
flask db migrate
flask db upgrade
