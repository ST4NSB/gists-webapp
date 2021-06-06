# Gist single page app

This is an application that gets all of the public gists for a github user (including name, description, programming language, forked by last 3 persons) and has the facility to view the code when clicking on the specific gist.

## How to run it
1. Build & Run **GistWebApi** C# asp web api (easiest way by using visual studio) (will run on *https://localhost:44314/gist/getcuratedgists/{username}*)
2. Open cmd (if using windows) & go to this repository folder
3. Install npm & node to run angular CLI commands
4. type **ng serve**
5. Now application will run on your localhost (will run on *http://localhost:4200/*)

## Logic
I've used the asp web api to make a get request and process the response because it's easier to work with json files using libraries in c#, instead of processing it on frontend (angular). Also now angular can have a model class which will just get the curated list of gists coming from the asp web api.

- ### C# ASP Web Api description
The method GetCuratedGists() in the Gist controller returns a curated list of gists for the username coming from the url get parameter (/gist/getcuratedgists/*{username}*).
This method makes 2 http calls using HttpWebRequest (one to list all gists for an user, endpoint: https://api.github.com/users/USERNAME/gists, and the other one is taking the forks_url json field from the first request and calling that link for each file, for example the forks_url json field will have the following format: https://api.github.com/gists/GIST_ID/forks). The request is wrapped in a try-catch statement because I don't want to interrupt the request if for example the maximum request per hour was reached.

I've used both JObject & JsonConvert libraries because JObject can't parse a json file which starts as an array (starts with '[' instead of '{'). The logic in there is simple, we make a request to get a list of all the gists and then we take only the fields which we need, using ```var keys = ((JObject)jObjGists["files"]).Properties().Select(p => p.Name).ToList();``` will get all the filename nodes which will contain information about the gist, but we know we only need the first one, so keys[0] will return the needeed file. 

To get only the latest 3 forkers, we make a request to get all forks, then we reverse the json file (based on my searches, I saw that the json file is sorted ascending by modified date and reversing it will sort them automatically in the descending order. Next we process only 3 forkers, this by calling the linq extension "list.Take(3)".

In the end we return a GistDetailModel (the same model will be in angular too) which is basically a curated model of a gist list request for an user.

The drawback of using this web api is the response time (mainly with few seconds).

- ### Angular project description
The angular project uses 4 components (app-main, search, gistdetail, errorpage component), 2 services(shared service which transfer the data between components and the gist service which makes http requests to my asp web api & gist file content) and 1 routing between components. 

The search component will call the gistService to get a curated list of gists given by my asp web api, the response will be wrapped in the GistDetailModel class and showed on results div if there are no errors (reqErrors variable is false). This component also has a method which will redirect to the gistdetail component if you clicked on a gist info div (the redirect will not send a query parameter with the model and instead it will use the sharedService to communicate between components). I've choosen to use a sharedService because I didn't want to send data in the url (sending for example the file url in a GET parameter in url). The search component also has some methods which will map the programming language to a HEX color by using some hash logic, so by using this method it's easier to view the programming language tags.

## Improvements

## Example images

![image](https://user-images.githubusercontent.com/38291834/120917183-62457a00-c6b6-11eb-83c7-4c2d9df9c1f5.png)
![image](https://user-images.githubusercontent.com/38291834/120917196-7d17ee80-c6b6-11eb-8199-d657c54455ab.png)
![image](https://user-images.githubusercontent.com/38291834/120917200-84d79300-c6b6-11eb-8521-0b97b3e4e5f1.png)
![image](https://user-images.githubusercontent.com/38291834/120917254-dc75fe80-c6b6-11eb-955b-ae028bf2d395.png)
![image](https://user-images.githubusercontent.com/38291834/120918995-fff17700-c6bf-11eb-8e41-fe68c0afa8d3.png)

