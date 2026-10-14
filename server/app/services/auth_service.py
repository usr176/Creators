
#temporary storage for users
users = {}

def register_user(name, email, passw):
    if email in users:
        return False, "User already exists."

    users[email] = {
        "name": name,
        "email": email,
        "password": passw
    }

    return True, "Registration Succesfull."

def login_user(email, passw):

    user = users.get(email)

    if not user:
        return False, None, "No such user exists."

    if user["password"] != passw:
        return False, None, "Incorrect Password"

    return True, {
        "name": user["name"],
        "email": user["email"]
    }, "Login Succesfull."