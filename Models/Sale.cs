using System;
using System.Collections.Generic;

namespace MVPTask.Models;

public partial class Sale
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public int? CustomerId { get; set; }

    public int? StoreId { get; set; }

    public DateTime? DateSold { get; set; }

    public virtual Product? Customer { get; set; }

    public virtual Customer? Product { get; set; }

    public virtual Store? Store { get; set; }
}
