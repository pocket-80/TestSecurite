using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // key ect 
using System.Linq;
using System.Web;


namespace TpTestSecurite.Models
{
    public class Produit
    {
        [Key]
        public int idProduit { get; set;}
        [Required]
        public string nomProduit { get; set; }
        public string descriptionProduit { get; set; }
        public int quantiteStock { get; set; }
    }
}