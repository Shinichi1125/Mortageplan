# Mortgageplan
An app that calculates the fixed monthly payment for the user's mortgage. 

# Top page screenshot
![StylizedTopPage](https://user-images.githubusercontent.com/37083992/109512126-6e64de80-7aac-11eb-8e04-beabc844548a.png)

# How to start the project in a local environment
* Replicate the entire project to your own PC by git clone
* Start the backend of the "MortageplanAPI" directory 
* Go to the directory "mortageplan-ui", and then hit the "npm start" command

# How to use this app
* Click "+ New Customer" if you want to create a new customer
* Provide an input value in each of the fields
* Click the "Submit" button
* You will be redirected to the top page and the new customer's information will be displayed along with the fixed monthly payment

# What I would have added if I had had more time
* More comprehensive unit test cases (so far I have written just a few test case scenarios)
* More thorough validations
  * The backend doesn't check if the input is not float (something like 0.5) for totalLoanEuro, totalLoanCent, years 
  * I haven't confirmed that the validation of the frontend side is properly working
* ~~Styling the UI more nicely by using CSS / Bootstrap~~ (Done)
* ~~Maybe adding some more functions~~ (update, ~~delete~~ etc) (partially done)
* ~~Refactoring the code to reduce redundancy~~ (Done)
