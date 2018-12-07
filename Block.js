function Block(string)
{
	var next = this;; //the next block in the chain
	var data = "done";
	var last = this;//the previous block in the chain, note the first block does not have one before it
	var hash = ""
	var bNum = 0;
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

	this.firstBlock = function()
	{
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

	/*this.setClicked = function(IdStr,errText)
	{
		var button = document.getElementById(IdStr)
		button.onclick = function()
		{
			if (errText.innerHTML == "")
			{
				var solved = false;
				var i;
				for (i = 0; !solved; i++)
				{
					//alert(i);
					next.getLast().calculateHash(last.getHash(),i)
					var cValue = complexity.value.toLowerCase();
					//alert(cValue);
					for (var j = 0; j < cValue.length; j++)
					{
						//alert(j);
						if (!(hash[j] == cValue[j]))
						{
							j = cValue.length;
						}
						else if (j == cValue.length - 1)
						{
							solved = true; 
							//alert("Solved");
						}
					}
				}
				document.getElementById("nonce"+IdStr[6]).innerHTML = i.toString();
				document.getElementById("hash"+IdStr[6]).innerHTML = hash;
			}
			else
			{
				alert("An error has occured while attempting to calculate the hash of Block " + bNum);
			}
		}
	}*/
}
	

	

	