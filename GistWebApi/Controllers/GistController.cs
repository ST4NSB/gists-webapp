using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace GistWebApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class GistController : ControllerBase
  {
    [HttpGet]
    [Route("getcuratedgists/{username}")]
    public List<GistDetailModel> GetCuratedGists(string username)
    {
      var responseGistDetailList = new List<GistDetailModel>();

      var gistDetailUrl = "https://api.github.com/users/" + username + "/gists";

      var resp = GetHttpResponse(gistDetailUrl);
      dynamic jsonResp = JsonConvert.DeserializeObject(resp);

      var jsonGists = new List<string>();
      foreach (var item in jsonResp)
      {
        string value = Convert.ToString(item);
        jsonGists.Add(value);
      }

      foreach (var json in jsonGists)
      {
        JObject jObjGists = JObject.Parse(json);
        var forksUrl = jObjGists["forks_url"].ToString();
        var respForks = GetHttpResponse(forksUrl);
        dynamic jsonRespForks = JsonConvert.DeserializeObject(respForks);

        var jsonForks = new List<string>();
        foreach (var item in jsonRespForks)
        {
          string value = Convert.ToString(item);
          jsonForks.Add(value);
        }
        jsonForks.Reverse(); // they are sorted by date ASC, so reverting will sort them DESC by date

        var forksDetails = new List<ForkDetailModel>();
        foreach (var fork in jsonForks.Take(3)) // we take only 3 user who forked
        {
          JObject jObjFork = JObject.Parse(fork);
          var userNameFork = jObjFork["owner"]["login"].ToString();
          var avatarFork = jObjFork["owner"]["avatar_url"].ToString();

          forksDetails.Add(new ForkDetailModel
          {
            Name = userNameFork,
            Avatar = avatarFork
          });
        }

        var keys = ((JObject)jObjGists["files"]).Properties().Select(p => p.Name).ToList();
        var filename = keys[0];

        responseGistDetailList.Add(new GistDetailModel
        {
          Id = jObjGists["id"].ToString(),
          Filename = filename,
          Owner = jObjGists["owner"]["login"].ToString(),
          Description = jObjGists["description"].ToString(),
          Languagetag = jObjGists["files"][filename]["language"].ToString(),
          Rawurl = jObjGists["files"][filename]["raw_url"].ToString(),
          ForksList = forksDetails
        });
      }

      return responseGistDetailList;
    }


    private string GetHttpResponse(string url)
    {
      try
      {
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(url);
        request.Method = "GET";
        request.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; " + "Windows NT 5.2; .NET CLR 1.0.3705;)";
        string respString = string.Empty;

        using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
        {
          Stream dataStream = response.GetResponseStream();
          StreamReader reader = new StreamReader(dataStream);
          respString = reader.ReadToEnd();
          reader.Close();
          dataStream.Close();
        }

        return respString;
      }
      catch(WebException)
      {
        return "[]"; // return an empty json array so it doesn't stop executing when request limit exceeded!
      }
    }
  }
}
