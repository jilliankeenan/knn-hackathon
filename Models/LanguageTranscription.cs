using System.Collections.Generic;

namespace knn_hackathon.Models
{
    public class LanguageTranscription
    {
        public string languageCode { get; set; }
        public List<Transcription> transcription { get; set; }
    }
}