function CreateBlock(String) //When initializes creates the first block, when user wants to create a block creates the next block and returns the 
{							 //current block and stores the newly created block
	var one = new Block(String); 
	one.firstBlock();
	this.build = function()
	{
		one.createNext();//creates the next block
		var temp = one;// set a temp variable to one
		one = one.getNext();//sets one as the newly created block
		return temp;// returns the current block
	}
}
