using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SportsStore.Models
{
    public class ProductRepository : IRepository 
    {
        private ProductDbContext context = new ProductDbContext();

        public IEnumerable<Product> Products
        {
            get { return context.Products; }
        }

        public async Task<int>
    }
}