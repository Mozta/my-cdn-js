/**
* Encrypt/Decrypt text using key
* @param string k - secret key
* @param string t - text
* @return string
*/
function rc4(k,t) {
  //key check
  if(k.length < 1 || k.length >256){
    alert("key length must be 1-256");
    return;
  }

  //KSA - Key Scheduling Algorithm
  //==============================
  //create 8-by-8 S-Box, fill it with numbers from 0 to 255
  var i,j,x;
  var sbox = [];//vector
  for(i=0;i<256;i++){
    sbox[i]=i;
  }
  j = 0;
  //randomize S-Box
  for(i=0;i<256;i++){
      //j = (j+sbox[i] + kbox[i]) mod 256;
      j = (j + sbox[i] + k.charCodeAt(i % k.length)) % 256;
    //swap S-Box position i to S-Box position j
    x = sbox[i];
    sbox[i] = sbox[j];
    sbox[j] = x;
  }
  console.dir(sbox);//final S vector


  i = 0;//counter i
  j = 0;//counter j
  //debugger;
  var ksc;//key stream character
  var ks = [];//key stream 
  var output;
  for(var m=0;m<t.length;m++){
    i = (i+1) % 256;
    j = (j + sbox[i]) % 256;
    //exchange sbox[i] with sbox[j]
    x = sbox[i];
    sbox[i] = sbox[j];
    sbox[j] = x;

    //keystream character:
    ksc = (sbox[i] + sbox[j]) % 256;

    //append encrypted char to output ( cleartext XOR keystream)
    output += String.fromCharCode(t.charCodeAt(m) ^ sbox[ksc]);
  }
  console.log(t);//string plain text
  console.log(ksc);//keystream
  console.log(output);//cipher text
  //debugger;
  return output;
}
