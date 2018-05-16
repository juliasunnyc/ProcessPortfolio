// A simple JS interveiw question for manipulating data
// Auther: Julia Sun
// Date: 3/25/2018

// require csv
var csv = require('csv');

// loads the csv module referenced above.
var obj = csv();   // load portfolio file

var mysf = csv();   //load portfolio share class file

var portfolio = [];  // store portfolios csv data
var portfolioShare = []; // store portfolio share class data

//var rst ={};             // bufer
//var path1 = '/Users/julias/dcc/Portfolio.CSV';
//var path2 = '/Users/julias/dcc/PortfolioShareClass.CSV';


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " Please enter files location. sample: node ReadPortfolio.js  /Users/me/Portfolio.CSV /Users/me/PortfolioShareClass.CSV");
    process.exit(-1);
}

path1 = process.argv[2];
path2 = process.argv[3];


//Create an entity to store the portfolio object
function Portfolios(name, code, mv) {
    this.PortfolioName = name;
    this.PortfolioCode = code;
    this.PortfolioMarketValue = mv;
};

// Create an entity to store Portfolio Shares object
function PortfolioShares(pname, cname, ccode, cfee) {
    this.base = Portfolios; //referenc to parent entity
    this.PortfolioName = pname;
    this.ShareClassName = cname;
    this.ShareClassCode = ccode;
    this.ShareClassFee = cfee;
}

try {

// data.length is not giving proper value, count the lines in files minus headers
    var i;
    var count = 0;
    require('fs').createReadStream(path1)
        .on('data', function(chunk) {
            for (i=0; i < chunk.length; ++i)
                if (chunk[i] == 10) count++;
        })
        .on('end', function() {
            // console.log(" my portfolio count is :" + count);
        });



    obj.from.path(path1).to.array(function (data) {
        for (var index = 1; index < count; index++) {  //skip headers
            portfolio.push(new Portfolios(data[index][0], data[index][1], data[index][2]));

        }
        console.log(portfolio);

    });

    var j;
    var counts = 0;
    require('fs').createReadStream(path2)
        .on('data', function(chu) {
            for (j=0; j < chu.length; ++j)
                if (chu[j] == 10) counts++;
        })
        .on('end', function() {
           // console.log(" my share class count is :" + counts);
        });


    mysf.from.path(path2).to.array(function (shares) {
        for (var ind = 1; ind < counts; ind++) {
            portfolioShare.push(new PortfolioShares(shares[ind][0], shares[ind][1], shares[ind][2], shares[ind][3]));

        }

        console.log(portfolioShare);

        console.log("Files are loaded successfully, please enter command");

        var stdin = process.openStdin();

        var param1 = [];

        stdin.addListener("data", function(d) {
            param1 =  d.toString().trim()
            // console.log(param1);

            var pfCnt = counts -1;
            var cnt = count -1;


            var lookup = {};
            var result = [];
            var lookup2 = {};
            var rstsc = [];

            for (var item, i = 0; item = portfolio[i++];) {
                var name = item.PortfolioName;
                if (!(name in lookup) ) {
                    lookup[name] = 1;
                    result.push(name);
                }

                var tn= 0;
                for (var item1, t = 0; item1 = portfolioShare[t++];) {
                    // var name1 = item1.ShareClassName;
                    var name2 = item1.PortfolioName;
                    if (name == name2)
                        tn++;
                }
                var m = tn.toString() + ' Share Class';
                result.push(m);
            }

            for (var item1, t = 0; item1 = portfolioShare[t++];) {
                var name1 = item1.ShareClassCode;
                if (!(name1 in lookup2) ) {
                    lookup2[name1] = 1;
                    rstsc.push(name1);
                }
            }

            var countclass = portfolioShare.reduce(function (r, row) {
                r[row.PortfolioName] = ++r[row.PortfolioName] || 1;
                return r;
            }, {});

            var resultList = Object.keys(countclass).map(function (key) {
                return { key: key, value: countclass[key] };
            });


            if( param1 == 'LIST PORTFOLIO') {


                console.log(result);

                console.log( "********************");

                console.log(" Key = Portfolio ******** Value Is Shared Class Count");

                console.log ( resultList);
            }

            if (param1 == 'COUNT')
            {
                console.log ( "Total " +  cnt  + "  portfolos are loaded");
                console.log ( "Total " +  pfCnt + "  share classes are loaded" );

            }

            if(param1== 'SHOW SHARE CLASS'){

                console.log( "Codes?");
                var st1  = process.openStdin();
                var param2 = [];

                st1.addListener("data", function(d) {
                    param2 = d.toString().trim();

                    var newArray =[];

                    var myname=[];

                    for (var it, ii = 0; it = portfolio[ii++];) {
                        var namei = it.PortfolioName;
                        var codei = it.PortfolioCode;

                        if (codei == param2) {
                            //   console.log(namei);
                            myname = namei;
                        }
                    };
                    // console.log(myname);

                    for (var itt, tt = 0; itt = portfolioShare[tt++];) {
                        var codej = itt.ShareClassName;
                        var namej = itt.PortfolioName;
                        var scode = itt.ShareClassCode;
                        var sfee = itt.ShareClassFee;
                        if (namej == myname){
                            //console.log(namej +","+ codej+","+ scode+ ","+ sfee);
                            newArray.push(namej, codej, scode, sfee)
                        }
                    };
                    console.log(newArray);
                } );
            }
        });
    });
}  catch (error)
{
    console.log("somethin wrong when processing data" + error);
}


