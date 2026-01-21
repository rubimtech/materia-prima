/**
 * ════════════════════════════════════════════════════════════════════════════
 * ORDO RUBIM — SYMPHONIA CODICIS (TYPESCRIPT VERSION)
 * LIBRETTO: MATERIA OBSCURA
 * TARGET: DENO / NODE / BUN (SERVER-SIDE OR STRICT CLIENT)
 * ════════════════════════════════════════════════════════════════════════════
 */

// [ACT I: VOCATIO ELEMENTORUM]

// ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

namespace Chaos {
    // // Hic sunt dracones.
    export class RawInput {
        // // Verbum congelatum est.
        constructor(public readonly data: string) {}

        // // Nihil ex nihilo fit.
        public isVoid(): boolean {
            return !this.data || this.data.trim().length === 0;
        }
    }

    export class EntropyFilter {
        // // Purgamentum init, purgamentum exit.
        public static purge(input: RawInput): void {
            // // Si silentium est...
            if (input.isVoid()) {
                // // ...clamor erroris audietur!
                throw new Error("ABYSSUS: Vacuitas non accipitur.");
            }
        }
    }
}

// ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

namespace Dictatura {
    export class Accuratio {
        // // Mensura sine errore.
        public static verifyPurity(value: number): void {
            // // Numerus insanus vetatur.
            if (Number.isNaN(value) || !Number.isFinite(value)) {
                throw new Error("HERESIS: Numerus non existit.");
            }
        }

        // // Quod imperfectum est, corrigetur.
        public static snapToGrid(value: number): number {
            const LIMEN = 1e-6; // Порог тишины
            if (Math.abs(value) < LIMEN) return 0.0;
            return value;
        }
    }

    // Имитация Мьютекса для однопоточного Event Loop 
    export class ImmutableLaw {
        private static _isLocked = false;

        // // Unus rex, una lex.
        public static acquireControl(): { release: () => void } {
            if (this._isLocked) {
                // В реальном async коде здесь был бы await queue
                throw new Error("VIOLATIO: Realitas jam occupata est (Re-entry detected).");
            }
            
            // // Ianua clauditur.
            this._isLocked = true;

            // Возвращаем "Ключ" (Disposable pattern)
            return {
                release: () => {
                    // // Ianua aperitur.
                    this._isLocked = false;
                }
            };
        }
    }
}

// ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

namespace MateriaObscura {
    export class VoidEngine {
        // // Et verbum caro factum est.
        public static invoke(will: string): void {
            // // Machina obsequitur.
            console.log(`[RUBIM] >>> Fiat: ${will}`);
        }
    }
}

// ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

export class Magister {
    // Singleton instance holder
    private static _instance: Magister;

    // Private constructor to prevent instantiation outside
    private constructor() {}

    // // Ego sum Alpha et Omega.
    public static get instance(): Magister {
        if (!this._instance) {
            this._instance = new Magister();
        }
        return this._instance;
    }

    // // In manu mea potestas est. 
    public dominariMateria(intentio: string): void {
        
        // // 1. INTROITUS (Вход)
        const input = new Chaos.RawInput(intentio);

        // // Si indignus es, discede. 
        Chaos.EntropyFilter.purge(input);

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        const guard = Dictatura.ImmutableLaw.acquireControl();

        try {
            // // 3. ACTIO 
            // // Mundus mutatur. 
            MateriaObscura.VoidEngine.invoke(intentio);
        } finally {
            // // 4. EXPLICIT 
            // // Pax vobiscum. 
            guard.release();
        }
    }
}

// ─── CANTUS QUINTUS: ADYTUM ─────────────────────────────────────────────────

export interface IInitiatus {
    // // Opus perfectum requiritur. 
    opusMagnum(guru: Magister): void;
}

export interface IInitiatusConstructor {
    // // Nomen est omen. (Имя есть знак.)
    readonly NOMEN_UMBRAE: string;
    new (): IInitiatus;
}

export class Adytum {
    public static openGates(AdeptClass: IInitiatusConstructor): void {
        // // Nomina sunt odiosa? Non hic. 
        const nomen = AdeptClass.NOMEN_UMBRAE;

        // // Sine nomine, sine vita. 
        if (!nomen || nomen.trim().length === 0) {
             throw new Error("DAMNATIO: Nomen vacuum.");
        }

        console.log("\n>>> GLORIA IN EXCELSIS CODEX.");
        console.log(`>>> Adventus: ${nomen}.\n`);

        try {
            const guru = Magister.instance;
            const neophyte = new AdeptClass();
            
            // // Incipit Tragoedia. 
            neophyte.opusMagnum(guru);
            
            console.log("\n>>> CONSUMMATUM EST. (Свершилось.)");

        } catch (e) {
            // // Dies irae, dies illa. 
            const msg = e instanceof Error ? e.message : String(e);
            console.error(`\n!!! LACRIMOSA: ${msg}`);
            process.exit(0xBADC0DE);
        }
    }
}

// ─── MACRO ACTIVATIONIS ─────────────────────────────────────────────────────

// Функция-обертка для запуска
export function InUmbraIgiturPugnabimus(AdeptClass: IInitiatusConstructor) {
    Adytum.openGates(AdeptClass);
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM 
// ════════════════════════════════════════════════════════════════════════════

/*
class Architectus implements IInitiatus {
    static readonly NOMEN_UMBRAE = "Architect_TS";

    opusMagnum(guru: Magister): void {
        guru.dominariMateria("Fiat Lux");
    }
}

InUmbraIgiturPugnabimus(Architectus);
*/