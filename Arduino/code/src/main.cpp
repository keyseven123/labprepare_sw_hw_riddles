#include <Arduino.h>
#include <math.h>

#define OR 1
#define AND 2

#define NO_INPUT 0
#define GREEN 2
#define YELLOW 3
#define BLUE 4
#define RED 5

void blinkRed()
{
    for(int i = 0; i < 5; i++)
    {
        digitalWrite(13,HIGH);
        delay(100);
        digitalWrite(13,LOW);
        delay(100);
    }
}

int gateCheck(int op)
{
    int check = 1;
    for (int i = 0; i < 4; i++)
    {
        int pinA = i % 2;
        int pinB = (i / 2) % 2;

        digitalWrite(11, pinA);
        digitalWrite(12, pinB);

        int out = digitalRead(4);
        digitalWrite(10, out);

        int opCheck;

        switch (op)
        {
        case AND:
            opCheck = ((pinA & pinB) == out);
            break;
        case OR:
            opCheck = ((pinA | pinB) == out);
            break;
        default:
            opCheck = 1;
        }

        if (!opCheck)
            check = 0;
        blinkRed();
    }
    digitalWrite(10,LOW);
    digitalWrite(11,LOW);
    digitalWrite(12,LOW);
    return check;
}

int readButton()
{
    if (digitalRead(A5))
        return RED;

    if (digitalRead(A4))
        return BLUE;

    if (digitalRead(A3))
        return YELLOW;

    if (digitalRead(A2))
        return GREEN;

    return NO_INPUT;
}

int isClose(int a, int b)
{
    if(fabs(a-b) < 50) return 1;
    return 0;
}

void setup()
{
    // put your setup code here, to run once:
    pinMode(13, OUTPUT);
    pinMode(11, OUTPUT);
    pinMode(12, OUTPUT);
    pinMode(4, INPUT);
    pinMode(5, OUTPUT);
    pinMode(10, OUTPUT);

}

void loop()
{
    digitalWrite(13,HIGH);
    int button = readButton();
    if (button != NO_INPUT)
    {
        int check = 0;
        blinkRed();
        if (button == RED) check = 1;
        
        if (button == GREEN && gateCheck(AND)) check = 1;

        if (button == YELLOW && gateCheck(OR)) check = 1;

        if (button == BLUE && isClose(analogRead(A0),345)) check = 1;
        
        digitalWrite(13,LOW);
        if(check)
        {
            digitalWrite(5, HIGH);
            delay(5000);
        }
        digitalWrite(5, LOW);
    }
}