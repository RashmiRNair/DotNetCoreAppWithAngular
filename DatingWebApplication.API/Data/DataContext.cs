using DatingWebApplication.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingWebApplication.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> option): base(option) { }

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }
    }
}
