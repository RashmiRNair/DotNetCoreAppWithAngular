using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingWebApplication.API.Helpers
{
    public class MessageParam
    {
        private int pageSize = 10;

        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }

        public string MessageContainer { get; set; } = "unread";


    }
}
