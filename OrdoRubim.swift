/**
 * ════════════════════════════════════════════════════════════════════════════
 * ORDO RUBIM — SYMPHONIA CODICIS (SWIFT VERSION)
 * LIBRETTO: MATERIA OBSCURA
 * PLATFORM: iOS / MACOS / METAL
 * ════════════════════════════════════════════════════════════════════════════
 */

import Foundation

// [ACT I: VOCATIO ELEMENTORUM]

// ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

enum Chaos {
    // // Hic sunt dracones.
    struct RawInput {
        let data: String
        
        // // Nihil ex nihilo fit.
        var isVoid: Bool {
            return data.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        }
    }

    enum EntropyFilter {
        // // Purgamentum init, purgamentum exit.
        static func purge(_ input: RawInput) throws {
            // // Si silentium est...
            guard !input.isVoid else {
                // // ...clamor erroris audietur!
                throw NSError(domain: "ABYSSUS", code: 404, userInfo: [NSLocalizedDescriptionKey: "Vacuitas non accipitur."])
            }
        }
    }
}

// ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

enum Dictatura {
    enum Accuratio {
        // // Mensura sine errore.
        static func verifyPurity(_ value: Double) throws {
            // // Numerus insanus vetatur.
            if value.isNaN || value.isInfinite {
                throw NSError(domain: "HERESIS", code: 500, userInfo: [NSLocalizedDescriptionKey: "Numerus non existit."])
            }
        }

        // // Quod imperfectum est, corrigetur.
        static func snapToGrid(_ value: Double) -> Double {
            let limen = 1e-6
            return abs(value) < limen ? 0.0 : value
        }
    }

    actor ImmutableLaw {
        // // Unus rex, una lex.
        func acquireControl(action: () -> Void) {
            // // Ianua clauditur. 
            action()
            // // Ianua aperitur.
        }
    }
}

// ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

enum MateriaObscura {
    enum VoidEngine {
        // // Et verbum caro factum est.
        static func invoke(_ will: String) {
            // // Machina obsequitur.
            print("[RUBIM] >>> Fiat: \(will)")
        }
    }
}

// ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

final class Magister {
    // // Ego sum Alpha et Omega.
    static let shared = Magister()
    
    private let law = Dictatura.ImmutableLaw()

    private init() {}

    // // In manu mea potestas est. 
    // Async function needed to enter the Actor's domain
    func dominariMateria(_ intentio: String) async throws {
        
        // // 1. INTROITUS (Вход)
        let input = Chaos.RawInput(data: intentio)

        // // Si indignus es, discede. 
        try Chaos.EntropyFilter.purge(input)

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        await law.acquireControl {
            // // 3. ACTIO 
            // // Mundus mutatur. 
            MateriaObscura.VoidEngine.invoke(intentio)
        }
        
        // // 4. EXPLICIT 
    }
}

// ─── CANTUS QUINTUS: ADYTUM ─────────────────────────────────────────────────

protocol Initiatus {
    // // Nomen est omen. 
    static var nomenUmbrae: String { get }

    // // Opus perfectum requiritur. 
    init()
    func opusMagnum(_ guru: Magister) async throws
}

enum Adytum {
    static func openGates<T: Initiatus>(for adeptType: T.Type) {
        let nomen = T.nomenUmbrae
        
        // // Sine nomine, sine vita. 
        guard !nomen.isEmpty else {
            fatalError("DAMNATIO: Nomen vacuum.")
        }

        print("\n>>> GLORIA IN EXCELSIS CODEX.")
        print(">>> Adventus: \(nomen).\n")

        Task {
            do {
                let guru = Magister.shared
                let neophyte = T()
                
                // // Incipit Tragoedia. 
                try await neophyte.opusMagnum(guru)
                
                print("\n>>> CONSUMMATUM EST. (Свершилось.)")
                exit(0) // Successful exit

            } catch {
                // // Dies irae, dies illa. 
                print("\n!!! LACRIMOSA: \(error.localizedDescription)")
                exit(0xBADC0DE)
            }
        }
        
        // Keep main thread alive for async task (Command Line Tool specific)
        RunLoop.main.run()
    }
}

// ─── MACRO ACTIVATIONIS ─────────────────────────────────────────────────────

func InUmbraIgiturPugnabimus<T: Initiatus>(_ type: T.Type) {
    Adytum.openGates(for: type)
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM 
// ════════════════════════════════════════════════════════════════════════════

/*
struct Architectus: Initiatus {
    static let nomenUmbrae = "Architect_iOS"

    func opusMagnum(_ guru: Magister) async throws {
        try await guru.dominariMateria("Fiat Lux")
    }
}

// InUmbraIgiturPugnabimus(Architectus.self)
*/