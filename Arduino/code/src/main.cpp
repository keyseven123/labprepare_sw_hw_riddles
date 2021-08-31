#include <Arduino.h>

#define NOR 1
#define NAND 2

int gateCheck(int op){
    int check = 1;
    for(int i = 0; i<4; i++){
        int pinA = i%2;
        int pinB = (i/2)%2;
        
        digitalWrite(13,pinA);
        digitalWrite(12,pinB);
    
        int out = digitalRead(4);
        digitalWrite(11,out);

        int opCheck;
        
        switch(op){
        case NAND: opCheck = ((pinA&pinB) == out); break;
        case NOR: opCheck = ((pinA|pinB) == out); break;
        default: opCheck = 1;
        }

        if(opCheck) check = 0;
        delay(800);
    }
    return check;
    }

    void setup(){
        // put your setup code here, to run once:
        pinMode(13,OUTPUT);
        pinMode(12,OUTPUT);
        pinMode(11, OUTPUT);
        pinMode(7,OUTPUT);
        pinMode(4,INPUT);
}


void loop() {
    // put your main code here, to run repeatedly:
    int ext = gateCheck(NAND);
    digitalWrite(7,ext);
}