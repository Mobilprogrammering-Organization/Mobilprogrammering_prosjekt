import LikeToggle from "@/components/LikeToggle";
import { render, screen, fireEvent } from "@testing-library/react-native";

// Simpel test for å komme inn i det
// Overdreven kommentering for min egen del

test("LikeToggle increases count total by 1", () => {
    
    
        // Brukes til å bestemme hva Math.random() skal returnere.
        // .mockReturnValue(0.1) betyr da 0.1 * 100, i dette tilfellet 10. 
        // Vankeslig å teste en verdi vi ikke vet hva er, derav "tvinge" en startsverdi
     const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.1);       


    try {

        render(<LikeToggle/>)               // Rendrer komponenten slik at vi kan teste komponenten uten Expo Go

        expect(screen.getByText("🔥 10"))   // Setter en forventning at teksten i likekanppen er "slik" ("🔥 10")
                                             // ettersom at .mockReturnValue setter den til 10 
                                             

        const knapp = screen.getByText("🔥 10");    // Finner tekstelementet som inneholder "🔥 10" 

        fireEvent.press(knapp);      // Simulerer en knappe-trykk der det står "🔥 10"   (i koden; <Text>"🔥 {count}"</Text>) 

        expect(screen.getByText("🔥 11")).toBeTruthy();  // Hva det "ønskelig resultatet" skal være etter at knappen er trykket av fireEvent.


    } finally {
        randomSpy.mockRestore();             
    }

});