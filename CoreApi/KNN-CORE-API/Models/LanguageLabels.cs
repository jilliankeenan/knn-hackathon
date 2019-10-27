using System.Collections.Generic;

namespace knn_hackathon.Models
{
    public class LanguageLabels
    {
        public string languageCode { get; set; }

        public List<VideoLabel> labels { get; set; }
    }
}