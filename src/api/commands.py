
import click
from api.models import db, User
from datetime import datetime, timedelta



"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 150
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of our command
    def insert_test_data(count):

        print("Creating test users")
        for x in range(1, int(count) + 1): 
            user = User()
            user.email = 'test_user' + str(x) + "@test.com"
            user.username = 'user' + str(x)
            user.password = "default_password"
            
            # For hire_date, subtracting x years + 22 years from current date
            user.hire_date = datetime.now() - timedelta(days=((x+22)*365))
            
            # For birthday, subtracting x years + 22 years + 22 years from current date
            user.birthday = datetime.now() - timedelta(days=((x+22+22)*365))

            # Calculating seniority based on hire_date (as years since hire_date)
            user.seniority = datetime.now().year - user.hire_date.year
            
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            
            print(f"User: {user.email}, Username: {user.username} created.")

        print("All test users created")

            ### Insert the code to populate others tables if needed