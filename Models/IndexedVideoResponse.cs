using System;
using System.Collections.Generic;
using System.Text;

namespace knn_hackathon.Models
{
    public class IndexedVideoResponse
    {
        public string description { get; set; }
        public string state { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string created { get; set; }
        public int durationInSeconds { get; set; }

        public List<IndexedVideo> videos { get; set; }
    }
}
