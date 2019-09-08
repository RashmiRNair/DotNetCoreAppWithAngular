using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingWebApplication.API.DTO
{
    public class PhotoForDetailsDTO
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public System.DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }

    }
}
