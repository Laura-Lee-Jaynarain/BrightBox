using System.Drawing;

namespace backend_NET.Models
{
    public class Tips
    {
       
        public string Icon { get; set; }
        public string Color { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Impact { get; set; }

        public Tips() { }
        public Tips(string icon, string color, string title, string description, string impact)
        {
            Icon = icon;
            Color = color;
            Title = title;
            Description = description;
            Impact = impact;
        }
    }
}