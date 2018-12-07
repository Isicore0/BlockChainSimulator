function Block(string)
{
	var next = this;; //the next block in the chain
	var data = "";
	var last = this;//the previous block in the chain, note the first block does not have one before it
	var hash = ""
	var bNum = 0;//Block number in the chain
	this.setData = function(string)
	{
		data = string;
	}

	this.getData = function()
	{
		return data;
	}

	this.getNext = function() //returns the next block in the chain
	{
		return next;
	}

	this.setNext = function(Block)//to set the next block in the chain as next
	{
		next = Block;
	}

	this.createNext = function()
	{
		next = new Block();
		next.setLast(this);
	}

	this.setLast = function(Block)//to set the previous block in the chain as the last variable
	{
		last = Block;
	}

	this.getLast = function()
	{
		return last;
	}

	this.calculateHash = function(String, Int)
	{
		hash = HashFunctionV2(String, Int);
		return hash;
	}

	this.firstBlock = function()//only ment to run for a block in the first position, this way its parent has will 
	{							//always be empty
		last = new Block();
	}

	this.getHash = function()
	{
		return hash;
	}

	this.setNum = function(Num)
	{
		bNum = Num;
	}

	this.getNum = function()
	{
		return bNum;
	}
}
	

	

	