# ProcessPortfolio
A node js code for processing portfolio dat
Create a data structure that holds a PORTFOLIO Entity with the following Elements:
Portfolio Name
Portfolio Code
Portfolio Market Value

Create a data structure that holds a PORTFOLIO SHARE CLASS Entity, which is a child of the Portfolio Entity.  A PORTFOLIO Entity has many PORTFOLIO SHARE CLASS children.  The PORTFOLIO SHARE CLASS Entity has the following Elements:
(A Reference to the Parent PORTFOLIO)
Portfolio Share Class Name
Portfolio Share Class Code
Portfolio Share Class Base Fee

Note: The PORTFOLIO ‘has a’ collection of a PORTFOLIO SHARE CLASS entities. A PORTFOLIO SHARE CLASS entity does not inherit from the PORTFOLIO Entity.
Create a node.js script that will:

Automatically load and populate the PORTFOLIO entity from a CSV file located in the same directory as the node.js script.  The name of the portfolio csv is: Portfolio.CSV

Automatically load and populate the PORTFOLIO SHARE CLASS entity from a CSV file located in the same directory as the node.js script.  The name of the portfolio share class csv is: PortfolioShareClass.CSV

If either file cannot be loaded for any reason, the program should end with a relevant error message.

If both files are loaded successfully, the program should give a message saying that it is ready to continue and present the user with a prompt to enter a command.

After the program process a command it should display the results and then present a new prompt for the next command.
Commands:

COUNTS  Should display the total number of portfolios and portfolio shares classes loaded from the CSVs.

Example Output:
>COUNTS
10 Portfolios loaded.
35 Portfolio Shares Classes loaded.

LIST PORTFOLIOS  Should display a list of all portfolios loaded showing the portfolio name and the number of share classes associated 

Example Output:
> LIST PORTFOLIOS
Amber State Capital Appreciation Fund, 4 Share Classes
Blue River Qualified Purchaser Fund, 5 Share Classes
Alpha Omega Delta Fund, 5 Share Classes
Hudson River Fund, 3 Share Classes
Macaulay Opportunity Fund, 2 Share Classes
….

SHOW SHARE CLASS  Should display a second prompt “Code?” asking for the portfolio code and then display all the share classes for that entered portfolio code.

Example Output:
> SHOW SHARE CLASS
Code? OPFND
Macaulay Opportunity Fund	New Issue Eligible	eMa	14%
Macaulay Opportunity Fund	Restricted Class	sMa	16% 

