from typing import List

""" 
0 1 0 -> 3, 1, 1 
0 1 0 0 -> 4, 2, 0 4 / 2 - 1 + 0
0 1 0 1 0 -> 5, 2, 1 
0 1 0 1 0 0 / 6, 3 - 1
0 1 0 1 0 1 0 / 7 3 - 1 + 1
"""

class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        count = 0
        for item