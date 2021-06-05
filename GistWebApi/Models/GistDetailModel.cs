using System.Collections.Generic;

namespace GistWebApi
{
  public class GistDetailModel
  {
    public string Id { get; set; }
    public string Filename { get; set; }
    public string Languagetag { get; set; }
    public string Rawurl { get; set; }
    public IEnumerable<ForkDetailModel> ForksList { get; set; }
  }
}
