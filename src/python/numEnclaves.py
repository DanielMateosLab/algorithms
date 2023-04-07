# 1020
from typing import Tuple, Dict, List

Location = Tuple[int, int]
LandNodesDict = Dict[Location, int]


class LandNode:
    def __init__(
        self,
        location: (Tuple[int, int]),
        chainI: int,
        landNodes: LandNodesDict,
        chainsLengths: Dict[int, int],
    ) -> None:
        self.colI = location[0]
        self.rowI = location[1]
        self.location = location
        self.chainId = chainI
        landNodes[location] = chainI
        chainsLengths[chainI] += 1


class Chain:
    # TODO: put chain id as a static value here
    def __init__(self) -> None:
        pass


class Solution:
    # Index/id of Last chain generated. 0 will never be used, so a chain Id is always truthy
    lastChainId = 0
    # Wether a chain has an exit
    chainsStatus: Dict[int, bool] = {}
    chainsLengths: Dict[int, int] = {}
    # Map of land nodes' location (colI, rowI) to it's chain id
    landNodes: LandNodesDict = {}
    noExitCount = 0

    def numEnclaves(self, grid: List[List[int]]) -> int:
        self.grid = grid
        self.height, self.width = len(grid), len(grid[0])
        self.maxColI, self.maxRowI = self.height - 1, self.width - 1
        for colI, col in enumerate(grid):
            for rowI, node in enumerate(col):
                isLand = bool(node)
                location = (colI, rowI)
                if isLand and not self.nodeChecked(location):
                    self.createChain(location)

    def createChain(self, location: Location) -> int:
        self.lastChainId = +1
        node = LandNode(location, self.lastChainId, self.landNodes, self.chainsLengths)
        self.checkIsEdge(node)
        self.searchLandConnections(node)
        # TODO: update noExitCount if chain has no exit

    def nodeChecked(self, location: Location):
        try:
            return bool(self.landNodes[location])
        except:
            return False

    def searchLandConnections(self, node: LandNode):
        minCol = min(node.colI - 1, 0)
        maxCol = max(node.colI + 1, self.maxColI)
        minRow = min(node.rowI - 1, 0)
        maxRow = max(node.rowI + 1, self.maxRowI)
        for col in range(minCol, maxCol + 1):
            for row in range(minRow, maxRow + 1):
                location = (col, row)
                if not self.nodeChecked(location):
                    newNode = LandNode(
                        location, node.chainId, self.landNodes, self.chainsLengths
                    )
                    self.checkIsEdge(newNode)
                    self.searchLandConnections(newNode)

    # If the node is an edge, sets the chain as with exit
    def checkIsEdge(self, node: LandNode):
        if self.chainsStatus[node.chainId] == True:
            return
        if (
            node.colI == 0
            or node.rowI == 0
            or node.colI == self.height - 1
            or node.rowI == self.width - 1
        ):
            self.chainsStatus[node.chainId] = True
