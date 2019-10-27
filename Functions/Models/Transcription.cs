using System.Collections.Generic;

namespace knn_hackathon.Models
{
    public class Transcription
    {
        public int id { get; set; }
        public string text { get; set; }
        public double confidence { get; set; }
        public int speakerId { get; set; }
        public string language { get; set; }
        public List<Instance> instances { get; set; }

    }
}