export default function Seller() {
  const [product, setProduct] = useState({
    ProductName: "",
    ProductDescription: "",
    satrtingBidPrice: 0,
    isSavedWithRelease: true,
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(e) =>
          setProduct({ ...product, ProductName: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Product Description"
        onChange={(e) =>
          setProduct({ ...product, ProductDescription: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Starting Price"
        onChange={(e) =>
          setProduct({ ...product, satrtingBidPrice: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Status"
        onChange={(e) =>
          setProduct({ ...product, isSavedWithRelease: e.target.value })
        }
      />
      <button>Add product</button>
    </div>
  );
}
