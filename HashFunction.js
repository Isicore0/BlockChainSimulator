function HashFunction(String, Int)//Calculates the hash of a block using Sha256 function with input of parent hash + data of the block + nonce
{
	var bytesv2 = "";
	for (var i = 0; i < String.length; ++i) //converts string into binary format (binary number)
	{
	  var code = String.charCodeAt(i);
	  
	  var bytes = (parseInt(code, 10).toString(2));

	  if (bytes.length == 8)
	  {
	  	bytesv2 = bytesv2.concat(bytes)
	  }
	  else
	  {
	  	bytesv2 = bytesv2.concat(0 + bytes)
	  }
	}
	bytesv2 = bytesv2.concat(parseInt(Int, 10).toString(2) + "1")//adds the nonce and a 1 to end of the binary number
	alert(bytesv2);



	var zeros = 512 - (bytesv2.length % 512);//calculates the number of zeros need to be added the binary number to make the length a multiple of 512

	for (var i = 0; i<zeros; i++)//adds the trailing zeros to the binary number to make the length a multiple of 512
	{
		bytesv2 = bytesv2.concat("0");
	}

	var blocks = bytesv2.match(/.{1,512}/g);//splits the binary number into an array, each group having a lengh of 512

	//h is a two dimensional array where h[0][0-7] is the initial hash values for sha256.
	var h = 
		["01101010000010011110011001100111", "10111011011001111010111010000101", "00111100011011101111001101110010", "10100101010011111111010100111010"
		,"01010001000011100101001001111111", "10011011000001010110100010001100", "10011011000001010110100010001100", "01011011111000001100110100011001"];

		//ah is the variables a to h, with 0 = a, 1 = b ..... 7 = h.
	var ah = h;

	//k contains the k constants for sha256
	var k = 
	["01000010100010100010111110011000", "01110001001101110100010010010001", "10110101110000001111101111001111", "11101001101101011101101110100101", 
	"00111001010101101100001001011011", "01011001111100010001000111110001", "10010010001111111000001010100100", "10101011000111000101111011010101", 
	"11011000000001111010101010011000", "00010010100000110101101100000001", "00100100001100011000010110111110", "01010101000011000111110111000011", 
	"01110010101111100101110101110100", "10000000110111101011000111111110", "10011011110111000000011010100111", "11000001100110111111000101110100", 
	"11100100100110110110100111000001", "11101111101111100100011110000110", "00001111110000011001110111000110", "00100100000011001010000111001100", 
	"00101101111010010010110001101111", "01001010011101001000010010101010", "01011100101100001010100111011100", "01110110111110011000100011011010", 
	"10011000001111100101000101010010", "10101000001100011100011001101101", "10110000000000110010011111001000", "10111111010110010111111111000111", 
	"11000110111000000000101111110011", "11010101101001111001000101000111", "00000110110010100110001101010001", "00010100001010010010100101100111", 
	"00100111101101110000101010000101", "00101110000110110010000100111000", "01001101001011000110110111111100", "01010011001110000000110100010011", 
	"01100101000010100111001101010100", "01110110011010100000101010111011", "10000001110000101100100100101110", "10010010011100100010110010000101", 
	"10100010101111111110100010100001", "10101000000110100110011001001011", "11000010010010111000101101110000", "11000111011011000101000110100011", 
	"11010001100100101110100000011001", "11010110100110010000011000100100", "11110100000011100011010110000101", "00010000011010101010000001110000", 
	"00011001101001001100000100010110", "00011110001101110110110000001000", "00100111010010000111011101001100", "00110100101100001011110010110101", 
	"00111001000111000000110010110011", "01001110110110001010101001001010", "00101101110011100110010100100111", "01101000001011100110111111110011", 
	"01110100100011111000001011101110", "01111000101001010110001101101111", "10000100110010000111100000010100", "10001100110001110000001000001000", 
	"10010000101111101111111111111010", "10100100010100000110110011101011", "10111110111110011010001111110111", "11000110011100010111100011110010"];			

	
	for (var i = 0; i < blocks.length; i++)//implements the sha256 algorithm 
	{
		var words = blocks[i].match(/.{1,32}/g);//breaks up a block into words, creating the first 16 words
		for (var j = 16; j < 64; j++)
		{//W[t] = Sigma1(W[t-2]) + W[t-7] + Sigma0(W[t-17]) + W[t-16] for 16 <= t <= 63.			
			words[j] = sumBinary([sigma1(words[j-2]),words[j-7],sigma0(words[j-15]),words[j-16]]);
			//document.write("<br>"+j+ "**     "+words[j]+"<br>");
		}
		/*for (var j = 16; j < 20; j++)
		{//W[t] = Sigma1(W[t-2]) + W[t-7] + Sigma0(W[t-17]) + W[t-16] for 16 <= t <= 63.			
			words[j] = sumBinary([sigma1(words[j-2]),words[j-7],sigma0(words[j-15]),words[j-16]]);
		}*/
		//document.write(words+"Blocks<br><br><br><br><br><br><br>")
		//document.write("<br>  w[18]      "+words[20-2] +"  w[13]  "+words[20-7]+"  w[5]  "+ words[20-15]+"  w[4]  "+words[20-16])
		//words[j] = sumBinary([sigma1(words[20-2]),words[20-7],sigma0(words[20-15]),words[20-16]]);
		for (var j = 0; j < 64; j++)

		{
			/*  T1 = 7 + Sum1(4) + Ch(4, 5, 6) + K[t] + W[t]
				T2 = Sum0(0) + Maj(0, 1, 2) 
				7 = 6
				6 = 5
				5 = 4
				4 = 3 + T1
				3 = 2
				2 = 1
				1 = 0
				0 = T1 + T2*/
			var t1 = sumBinary([ah[7],sum1(ah[4]),choose(ah[4], ah[5], ah[6]), k[j], words[j]]);
			var t2 = sumBinary([sum0(ah[0]),majority(ah[0],ah[1],ah[2])]);
			ah[7] = ah[6];
			ah[6] = ah[5];
			ah[5] = ah[4];
			ah[4] = sumBinary([ah[3],t1]);
			ah[3] = ah[2];
			ah[2] = ah[1];
			ah[1] = ah[0];
			ah[0] = sumBinary([t1,t2]);
		}
		for (var j = 0; j < 8; j++)
		{

			h[i] = sumBinary([ah[i], h[i]]);
			ah[i] = h[i];		
		}
	}
	var hashValue = "";
	for (var i = 0; i < 8; i++)
	{
		//alert(h[i]+"<br><br><br>")
		h[i] = parseInt(h[i],2).toString(16);
		//alert(h[i]+"<br><br><br>")
		for (var j = h[i].length; j < 8; j++)
		{
			h[i] = "0".concat(h[i]);
			//alert(h[i]+"<br><br><br>")
		}
		hashValue = hashValue.concat(h[i]);
		//document.writeln(hashValue+"<br><br><br>");
	}
	return hashValue;	
}

function sigma1(String)//used in creating 17-64 words
{
	//document.write("<br> ###  "+xOr(rotateRight(String, 17), rotateRight(String, 19), ShiftRight(String, 10))+"<br>");
	return xOr(rotateRight(String, 17), rotateRight(String, 19), ShiftRight(String, 10));
}

function rotateRight(String, Int)//A bitwise right rotate, removes a number of digets from the end and adds them to the front keeping the same length
{
	//alert(String.length);
	var num = 32-Int;
	var str = "";
	for (var i = num; i < 32; i++)
	{
		//document.write("<br> "+i+ "~~~~>  "+String[i]+"<br>");
		//alert(str+"____"+i+"____"+String[i]);
		str = str.concat(String[i]);
	}
	for (var i = 0; i < num; i++)
	{
		//alert(str);
		//document.write("<br> "+i+ "~~~~>  "+String[i]+"<br>");
		str = str.concat(String[i]);
	}
	//document.write("<br> @@@  "+str+"<br>");
	return str;
}

function ShiftRight(String, Int)//bitwise unsigned right shift, a number of digets are removed from the end and replaced with zeros at the front to keep the
{								//same length
	var num = 32-Int;
	var str = "";
	for (var i = num; i < 32; i++)
	{
		str = str.concat("0");
	}
	for (var i = 0; i < num; i++)
	{
		str = str.concat(String[i]);
	}
	return str;
}

function xOr(String0, String1, String2)//bitwise XOR, takes three inputs, for each character position for all strings where 0, 0, 0 = 0. 0, 1, 1 = 0.
{									   //0, 0, 1 = 1. 1, 1. 1 = 1. Order does not matter. 
	var str = "";
	for (var i = 0; i < 32; i++)
	{
		str = str.concat((parseInt(String0[i]) + parseInt(String1[i]) + parseInt(String2[i])) % 2);
	}
	return str;
}

function sigma0(String)//used in creating 17-64 words
{
	return xOr(rotateRight(String, 7), rotateRight(String, 18), ShiftRight(String, 3));
}

function cutTo32(String)
{
	var size = String.length;
	var str = "";
	for (var i = size - 32; i < size; i++)
	{
		//document.write("<br>   "+i+"  ?????   "+str+"<br>");
		str = str.concat(String[i]);
	}

	//document.write("<br>  [][][][]   "+str+"<br>");
	return str;
}

function sum1(String)
{
	return xOr(rotateRight(String,6), rotateRight(String,11), rotateRight(String,25));
}

function sumBinary(Int)
{
	var sum = 0;
	for (var i = 0; i < Int.length; i++)
	{
		//document.write("<br"+i+"++    "+sum+"<br>")
		sum = sum + parseInt(Int[i],2);
	}
	var str = "00000000000000000000000000000000";
	str = str.concat(sum.toString(2));
	return cutTo32(str);
}

function choose(String0, String1, String2)
{
	var str = "";
	for (var i = 0; i < 32; i++)
	{
		if (String0[i] == "1")
		{
			str = str.concat(String1[i]);
		}
		else 
		{
			str = str.concat(String2[i]);
		}
	}
	return str;
}

function sum0(String)
{
	return xOr(rotateRight(String, 2), rotateRight(String, 13), rotateRight(String, 22));
}

function majority(String0, String1, String2)
{
	var str = "";
	for (var i = 0; i < 32; i++)
	{
		str = str.concat((0 + ((parseInt(String0[i]) + parseInt(String1[i]) + parseInt(String2[i])) > 1)).toString()); 
	}
	return str;
}