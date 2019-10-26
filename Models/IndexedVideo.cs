using System;
using System.Collections.Generic;
using System.Text;

namespace knn_hackathon.Models
{
    public class IndexedVideo
    {
        public string language { get; set; }
        public VideoInsights insights { get; set; }
        public string thumbnailId { get; set; }
    }
}
