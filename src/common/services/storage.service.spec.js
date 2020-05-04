import { getLocalStorageItem, setLocalStorageItem } from "./storage.service";

describe("storage service ", () => {

    it("should set and get local storage item", () => {
        setLocalStorageItem('cart', {cartList: [], totalPrice: 0});
        const storageItem = getLocalStorageItem('cart');
        expect(storageItem.totalPrice).toEqual(0);
    });
});
