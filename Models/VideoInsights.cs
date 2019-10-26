using System.Collections.Generic;

namespace knn_hackathon.Models
{
    public class VideoInsights
    {
        public List<Transcription> transcript { get; set; }
        public List<VideoLabel> labels { get; set; }
        public List<string> languages { get; set; }
    }
}