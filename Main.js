Main();
function Main()
{
	var blocks = [];
	var bMaker = new CreateBlock();//block maker
	var create = document.getElementById("create");
	var table = document.getElementById("table");
	Complexity();
	create.onclick = function()
	{
		var bNum = blocks.length; //block number to be created
		var bNString = bNum.toString();//string version of bNum
		blocks[bNum] = bMaker.build();
		var tRow = table.rows.length - 1;//table row, number of table rows
		var hash = calcHash(blocks[bNum], 0);
		if (tableRowSize(table, tRow) > Math.round(screen.width / 600) - 2)
		{
			addBR(table, tRow)
			table.insertRow(tRow+1);
		}
		addBlock(table, tRow, bNString, hash);
		for (var i = 0; i < bNum + 1; i++)
		{
			button = document.getElementById("button"+i);
			var block = blocks[i];
			block.setNum(i);
			button.onclick = (function(block)
			{
				return function()
				{
					if (document.getElementById("error").innerHTML == "")
					{
						var solved = false;
						var j;
						var bNum = block.getNum().toString();
						for (j = 0; !solved; j++)
						{
							hash = calcHash(block, j);
							var cValue = document.getElementById("complexity").value.toLowerCase();
							for (var k = 0; k < cValue.length; k++)
							{
								if (!(hash[k] == cValue[k]))
								{
									k = cValue.length;
								}
								else if (k == cValue.length - 1)
								{
									solved = true; 
								}
							}
						}
						document.getElementById("nonce"+bNum).innerHTML = j.toString();
						document.getElementById("hash"+bNum).innerHTML = block.getHash();
						alert(bNum == 0 || document.getElementById(bNum-1).style.backgroundColor == "LightGreen");
						if (bNum == 0 || document.getElementById(bNum-1).style.backgroundColor == "LightGreen")
						{
							document.getElementById("D"+bNum).style.backgroundColor = "LightGreen";
						}
					}
					else
					{
						alert("An error has occured while attempting to calculate the hash of Block " + k);
					}
				};
			})(block);
		}
	};
}

function calcHash(Block, Int)
{
	return Block.calculateHash(Block.getLast().getHash(),Int)
}

function getLastHash(Block)
{
	return Block.getLast().getHash();
}

function tableRowSize(Table, Row)
{
	return Table.rows[Row].cells.length
}

function addBR(Table, Row)
{
	Table.rows[Row].innerHTML = Table.rows[Row].innerHTML.concat("<br>");
}

function addBlock(Table, Row, NumStr, Hash)
{
	Table.rows[Row].innerHTML = Table.rows[Row].innerHTML.concat("<td width=\"0\" valign=\"top\" align=\"left\"><div id=\"D"+NumStr+"\"><span id=\"name"
			+NumStr+"\">Block "+NumStr+"</span><br>Nonce: <span id=\"nonce"+NumStr+"\">0</span><br>Data<textarea cols=\"68\" id=\"txt"+NumStr+"\"></textarea><br>"
			+"Hash: <span id=\"hash"+NumStr+"\">"+Hash+"</span><br><button type=\"button\" id=\"button"+NumStr+"\"/>Solve</button></div></td>");
}