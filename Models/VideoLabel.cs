using System.Collections.Generic;

namespace knn_hackathon.Models
{
    public class VideoLabel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string language { get; set; }
        public List<Instance> instances { get; set; }
    }
}