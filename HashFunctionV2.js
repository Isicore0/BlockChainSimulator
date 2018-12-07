function HashFunctionV2(String, Int)//Calculates the hash of a block using Sha256 function with input of parent hash + data of the block + nonce
{									//This is my second version
	var binStr = toBinaryString(strDecToStrBinArr(String), String.length, 0);//binStr is Binary String, the string in binary format
	binStr = binStr.concat(intToBinStr(Int), "1");//adds the nonce and a 1 to end of the binary number


	var blocks = makeBlocks(binStr);// makes a block from the binStr into a length a multiple of 512
																											
	var h = //the initial hash values in binary format
		["01101010000010011110011001100111", "10111011011001111010111010000101", "00111100011011101111001101110010", "10100101010011111111010100111010"
		,"01010001000011100101001001111111", "10011011000001010110100010001100", "10011011000001010110100010001100", "01011011111000001100110100011001"];	
	var k = //the 64 k constants from sha256
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

	h = sha256(blocks, 0, blocks.length, h, k);
	h = h.map((a) => parseInt(a,2).toString(16));
	h = h.map((a) => checkSize(a,8,0));
	return remove(h.join(),",");
}

function toBinaryString(String, LenStr, IntI)//converts a String to binary string format , String is the String getting converted
{											 //LenStr is the length of the string, IntI is the itteration 
	if (IntI < LenStr)
	{
		if (String[IntI].length < 8)
		{
			String[IntI] = "0".concat(String[IntI]);
		}
		return toBinaryString(String, LenStr, ++IntI);
	}
	return String; 
}

function sha256(Blocks, IntI, BSize, H, K)//Runst the Sha256 algorithm, IntI is the itteration, BSize is block size
{
	if (IntI < BSize)
	{
		words = createWords(Blocks[IntI].match(/.{1,32}/g), 16);
		var ah = hashing(H, K, 0);// ah are the variables a through h from sha256, with 0 = a, 1 = b....7 = h
		H = updateH(ah, H, 0);
		return sha256(Blocks, ++IntI, BSize, H, K);
	}
	return H; 
}

function createWords(Words, IntI)
{
	if (IntI < 64)
	{// W[t] = Sigma1(W[t-2]) + W[t-7] + Sigma0(W[t-17]) + W[t-16] for 16 <= t <= 63.	
		Words[IntI] = sumBinary([sigma1(Words[IntI-2]),Words[IntI-7],sigma0(Words[IntI-15]),Words[IntI-16]], to32);
		Words = createWords(Words,++IntI);
	}
	return Words;
}

function sumBinary(Int, Fct)//sums binary strings together
{
	Int = Int.map((a) => parseInt(a,2));
	var sum = Int.reduce((a, b) => a + b, 0);
	return Fct(sum);
}

function to32(Str)//Shortens a string to 32 characters from the end
{
	Str = "0000000000000000000000000000000".concat(Str.toString(2));
	return Str.slice(Str.length - 32, Str.length)
}

function xOr(String0, String1, String2, IntI)//bitwise XOR, takes three inputs, for each character position for all strings where 0, 0, 0 = 0. 0, 1, 1 = 0.
{									     	 //0, 0, 1 = 1. 1, 1. 1 = 1. Order does not matter. 
	if (IntI < 32)
	{
		return sumBinary([String0[IntI], String1[IntI], String2[IntI]], ChkEqlToTwo).concat(xOr(String0, String1, String2, ++IntI));
	}
	return "";
}

function hashing(H, K, IntI)//part of the sha256 algorith
{
	if (IntI < 64)
	{
		var ah = new Array(8);
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
		var t1 = sumBinary([H[7],sum1(H[4]),choose(H[4], H[5], H[6], 0), K[IntI], words[IntI]], to32);
		var t2 = sumBinary([sum0(H[0]),majority(H[0],H[1],H[2])], to32);
		ah[7] = H[6];
		ah[6] = H[5];
		ah[5] = H[4];
		ah[4] = sumBinary([H[3],t1], to32);
		ah[3] = H[2];
		ah[2] = H[1];
		ah[1] = H[0];
		ah[0] = sumBinary([t1,t2], to32);
		return hashing(ah, K, ++IntI);
	}
	return H;
}

function choose(String0, String1, String2, IntI)
{
	
	if (IntI < 32)
	{
		if (String0[IntI] == "1")
		{
			return String1[IntI].concat(choose(String0, String1, String2, ++IntI));
		}
		else 
		{
			return String2[IntI].concat(choose(String0, String1, String2, ++IntI));
		}
	}
	return "";
}

function majority(String0, String1, String2, IntI)
{
	if (IntI < 32)
	{
		return sumBinary([String0[IntI], String1[IntI], String2[IntI]], ChkGrtrThanOne).concat(majority(String0, String1, String2, ++IntI)); 
	}
	return "";
}

function updateH(AH, H, IntI)
{
	if (IntI < 8)
	{
		H[IntI] = sumBinary([AH[IntI],H[IntI]], to32)
		return updateH(AH, H, ++IntI);
	}
	return H;
}

function strDecToStrBinArr(String)//converts a String to its binary equivalents from each characters ascii code
{
	if (String.length > 0)
	{
		return remove(String.match(/.{1,1}/g).map((a) => a.charCodeAt(0).toString(2)).join(),",");
	}
	return remove(String);
}

function intToBinStr(Int)//converts a decimal number to binary 
{

	return parseInt(Int, 10).toString(2);
}

function makeBlocks(binStr)//takes a binary string lengthns it with zeros to make it a multiple of 512, then returns the string in 
{						   //in an array each slot has 512 length
	var str = binStr.concat(numOfZeros(binStr.length)); 
	return str.match(/.{1,512}/g);
}

function numOfZeros(Int)//creats the number of zeros necessary to make a string length a multiple of 512
{
	return "0".repeat(512 - (Int % 512));
}

function sigma1(String)
{
	return xOr(rotateRight(String, 17), rotateRight(String, 19), shiftRight(String, 10),0);
}

function rotateRight(String, Int)
{
	return "".concat(String.slice(32-Int,32)+String.slice(0, 32-Int));
}

function shiftRight(String, Int)
{
	return "0".repeat(Int).concat(String.slice(0,32-10));
}

function sigma0(String)
{
	return xOr(rotateRight(String, 7), rotateRight(String, 18), shiftRight(String, 3),0);
}

function sum1(String)
{
	return xOr(rotateRight(String,6), rotateRight(String,11), rotateRight(String,25),0);
}

function sum0(String)
{
	return xOr(rotateRight(String, 2), rotateRight(String, 13), rotateRight(String, 22),0);
}


function ChkGrtrThanOne(Int)//checks if value is greater than 1, return a string, 1 for true, 0 for false
{
	return (0 + (Int > 1)).toString()
}

function ChkEqlToTwo(Int)//checks if value is equal to 2, return a string, 1 for true, 0 for false
{
	return (0 + (Int == 2)).toString()
}

function remove(String, Char)//removes all occurances of a charcter from a string
{
	var num = String.indexOf(Char);
	if (num > -1)
	{
		return remove(String.slice(0,num).concat(String.slice(num+1, String.length)), Char);
	}
	return String;
}

function checkSize(String, Num, IntI)//checks if String length is == num and adds leading zeros until its true
{
	if (String.length + IntI < Num)
	{
		return "0".concat(checkSize(String, Num, ++IntI));
	}
	return String;
}