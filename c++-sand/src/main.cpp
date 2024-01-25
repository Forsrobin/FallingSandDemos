#include <iostream>
#include "includes/game_manager.h"

int main(void)
{

    std::cout << "Falling Sand Game TM" << std::endl;

    GameManager gameManager;
    gameManager.run();
    return 0;
}