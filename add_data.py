import random


prenoms = ["Doe", "Smith", "Johnson", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White"]

def add_users(number_of_users):
     string = "INSERT INTO Compte (username, mdp) VALUES" + ",".join([f"('{prenoms[i]}','{str(random.randint(0,100000))}')" for i in range(number_of_users)])
     return string

def add_post(number_of_users):
    string = "INSERT INTO Discussion (username, dateCréation, titre) VALUES"
    string += ",".join([f"('{prenoms[i]}', NOW() , 'salut numero {str(random.randint(0,1000))}')" for i in range(number_of_users)])
    return string



print(add_users(20))
print(add_post(20))
