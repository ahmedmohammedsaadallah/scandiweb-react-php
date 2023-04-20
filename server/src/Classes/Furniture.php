<?php
namespace Server\Classes;
use Server\Classes\Product;
// Define Furniture class that extends Product
class Furniture extends Product
{
    private $height;
    private $width;
    private $length;
    
    // $dimensions is a string combined from height ,width, length separated by x
    public function __construct($sku, $name, $price, $dimensions, $productType)
    {
        parent::__construct($sku, $name, $price, $productType);
        $dimensionsArray = explode('x', $dimensions);
        $this->height = $dimensionsArray[0];
        $this->width = $dimensionsArray[1];
        $this->length = $dimensionsArray[2];
    }
    
    //set height
    public function setHeight($height)
    {
        $this->height = $height;
    }

    //get height
    public function getHeight()
    {
        return $this->height;
    }

    //set width
    public function setWidth($width)
    {
        $this->width = $width;
    }

    //get width
    public function getWidth()
    {
        return $this->width;
    }

    //set length
    public function setLength($length)
    {
        $this->length = $length;
    }

    //get length
    public function getLength()
    {
        return $this->length;
    }
    public function getFormattedTypeSpecificInformation()
    {
        return "Dimension: " . $this->getHeight() . 'x' . $this->getWidth() . 'x' . $this->getLength();
    }
    public function saveProduct($conn)
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $dimensions = $this->getHeight() . "x" . $this->getWidth() . "x" . $this->getLength();
        $productType = $this->getProductType();
        $sqlQuery = "INSERT INTO `products` SET sku = :sku, name = :name, price = :price, type_specific_information = :dimensions, product_type = :productType";
        $stmt = $conn->prepare($sqlQuery);
        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':dimensions', $dimensions);
        $stmt->bindParam(':productType', $productType);
        $stmt->execute();
    }
}
