## Table of contents:
1. App brief details
2. Tech stack 
3. How to use 
4. How to log in 
5. How to create an account
6. How to set up 
7. Contact Information

# 1. App brief details
## App: LOCAL CONNECT [https://local-connect-5mxf.onrender.com/]
A Full-stack web application that connects local service providers (electricians, plumbers) with nearby 
customers.
### (Working principle: A customer is a service provider and vice versa)
### Features:
  1. Users can create an Account and log in to Local Connect.
  2. In the dashboard list of all services available to the users.
  3. When the user clicks on a service then it navigates to the service providers' page, where the service providers' contact details are available; the list of service providers is rendered based on the user's location and the service that the user clicks.

# 2. Tech Stack
## Front-End: 
### React JS:
  1. Component-based design, to improve reusability
  2. Mainly used class components
  3. Managed dynamic data in State
  4. JSX
  5. In Local storage/Client-side storage, cookies are used to store the JWT(JSON Web Token).
  6. Protected Routing to only give access to the login users over application pages.
  7. By using React context, I managed the important data throughout the application. 
### CSS:
  1. Flex-box, to arrange elements and achieve a clean, structured design.
  2. Media queries, to give the styling to elements based on screen size. (Responsive design)
### HTML5:
  1. Semantic tags, to achieve clean and readable HTML code.
  2. Meaningful class names related to the element's content.

## Back-End:
### Node JS
### Express JS
  1. RESTful APIs.
  2. jsonwebtoken (JWT Token), to manage Authorization and Athentication.
  3. bcrypt, to hash the passwords before storing in database.
  
## Database:
### MongoDB:
  1. Mongoose
  2. Used Schema to get control over the fields.
  
  
# 3. How to use 
   1. After logging in to Local Connect using login details, it navigates to the home(dashboard) page.
   2. In the home page, you can see the list of services which are avalilable in the Local Connect application, around 40 services available now.
   3. You can get the list of service providers based on the location(city) when you click on the service card.
   4. For example, assume you are from Guntur and clicked on the Plumber service card, than you can see the plumbers list in Guntur. If no plumber is registered in our application, then you will see a "NOT FOUND" message.
   5. On the list of service providers, you can find the contact details such as Mail or phone number, you can directly contact with them.

# 4. How to log in 
On the login page, you just need to fill in the two inputs, both are required
### 1. Gmail Address: Enter your email address.
### 2. Password: Enter your password.
### 3. Next step is to click on the "Login" button.
If the email you entered is not already registered, you will receive the following error message:
Error: "User with this Email ID doesn't exist"
If the password doesn't match the email, you will receive the following error message:
Error: "Incorrect password"
NOTE: If you dont have an account, please create an account, then try log in. On the bottom, you can see a "Create here", use it to navigate Create account page. 

# 5. How to create a new account
To create an account in this application, follow these steps:

Navigate to the Register or Sign Up page in the app.

Fill in the required fields. All fields are mandatory:

### Name – Enter your full name.
### Email – Enter a valid and unique email address. This will be used for login.
### Age – Enter your age in numbers.
### Service – Select a service from the dropdown list (currently, there are around 40 services available).
### State – Choose your state from the dropdown menu.
### District – Choose your district from the dropdown menu.
### City – Choose city from the dropdown menu.
### Password – Enter a secure password to protect your account.

### After completing the form, click the "Create Account" button.

If you miss any input and press the "Create Account" button, you will receive the following error:
Error: "Fill the required fields!"

If the email you entered is already registered, you will receive the following error message:
Error: "Email already registered"

# 6. How to set up 
To set up this project in your local system
### clone
git clone https://github.com/saibabu-7272/local-connect-app
### go to project folder
cd local-connect-app
### start app 
npm start



# 7. Contact Information
  Developed by 
  ## G Sai Babu
  Role 
  ## Full-Stack
  Email 
  ## saibabu61242@gmail.com
