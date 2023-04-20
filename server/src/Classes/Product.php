<?php
namespace Server\Classes;
// Define abstract Product class
abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $productType;
    
    public function __construct($sku, $name, $price, $productType)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productType = $productType;
    }
    // set SKU
    public function setSku($sku)
    {
        $this->sku = $sku;
    }
    // set Name
    public function setName($name)
    {
        $this->name = $name;
    }

    //set Price
    public function setPrice($price)
    {
        $this->price = $price;
    }

    //set productTyoe
    public function setProductType($productType)
    {
         $this->productType = $productType;
    }

    //get SKU
    public function getSku()
    {
        return $this->sku;
    }

    //get Name
    public function getName()
    {
        return $this->name;
    }

    //get Price
    public function getPrice()
    {
        return $this->price;
    }

    //get productTyoe
    public function getProductType()
    {
        return $this->productType;
    }
    abstract public function getFormattedTypeSpecificInformation();
    abstract public function saveProduct($conn);
}
