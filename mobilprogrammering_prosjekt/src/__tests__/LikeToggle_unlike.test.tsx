import LikeToggle from "@/components/LikeToggle";
import { render, screen, fireEvent } from "@testing-library/react-native";

// 

test("LikeToggle increases count total by 1, and when 'un-liked', decreases the value by 1", () => {
    
    
        // Brukes til å bestemme hva Math.random() skal returnere.
        // .mockReturnValue(0.1) betyr da 0.1 * 100, i dette tilfellet 20. 
        // Vankeslig å teste en verdi vi ikke vet hva verdien er, derav "tvinge" en startsverdi
     const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.2);        


    try {


        // DEL 1 
        // Fra ikke-enda like'a til like
        // Gjenbruker for 'LikeToggle_like.test.tsx' her, bare med annen startverdi


        render(<LikeToggle/>)              

        expect(screen.getByText("🔥 20")).toBeOnTheScreen();   
                                             

        const trykk = screen.getByText("🔥 20");    

        fireEvent.press(trykk);      

        expect(screen.getByText("🔥 21")).toBeOnTheScreen();  


        // DEL 2
        // Fra likt til ikke-like lengre.


        const trykk2 = screen.getByText("🔥 21");    

        fireEvent.press(trykk2);      


        expect(screen.getByText("🔥 20")).toBeOnTheScreen();




    } finally {
        randomSpy.mockRestore();             
    }

});