/**
 * ════════════════════════════════════════════════════════════════════════════
 * ORDO RUBIM — SYMPHONIA CODICIS (KOTLIN VERSION)
 * LIBRETTO: MATERIA OBSCURA
 * PLATFORM: ANDROID / JVM
 * ════════════════════════════════════════════════════════════════════════════
 */

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.runBlocking
import kotlin.math.abs

// [ACT I: VOCATIO ELEMENTORUM]

// ─── CANTUS PRIMUS: CHAOS ET ORDO ───────────────────────────────────────────

object Chaos {
    // // Hic sunt dracones.
    @JvmInline
    value class RawInput(val data: String) {
        // // Nihil ex nihilo fit.
        fun isVoid(): Boolean = data.isBlank()
    }

    object EntropyFilter {
        // // Purgamentum init, purgamentum exit.
        fun purge(input: RawInput) {
            // // Si silentium est...
            if (input.isVoid()) {
                // // ...clamor erroris audietur!
                throw IllegalArgumentException("ABYSSUS: Vacuitas non accipitur.")
            }
        }
    }
}

// ─── CANTUS SECUNDUS: LEX AETERNA ───────────────────────────────────────────

object Dictatura {
    object Accuratio {
        // // Mensura sine errore.
        fun verifyPurity(value: Double) {
            // // Numerus insanus vetatur.
            if (value.isNaN() || value.isInfinite()) {
                throw ArithmeticException("HERESIS: Numerus non existit.")
            }
        }

        // // Quod imperfectum est, corrigetur.
        fun snapToGrid(value: Double): Double {
            const val LIMEN = 1e-6 
            return if (abs(value) < LIMEN) 0.0 else value
        }
    }

    object ImmutableLaw {
        private val gateKeeper = Mutex()

        // // Unus rex, una lex.
        suspend fun <T> acquireControl(action: suspend () -> T): T {
            // // Ianua clauditur. 
            return gateKeeper.withLock {
                // // Intra sanctum.
                action()
            }
        }
    }
}

// ─── CANTUS TERTIUS: MACHINATIO ─────────────────────────────────────────────

object MateriaObscura {
    object VoidEngine {
        // // Et verbum caro factum est.
        fun invoke(will: String) {
            // // Machina obsequitur.
            println("[RUBIM] >>> Fiat: $will")
        }
    }
}

// ─── CANTUS QUARTUS: MAGISTER ───────────────────────────────────────────────

object Magister {
    // // Ego sum Alpha et Omega.
    // (Kotlin object is a thread-safe Singleton by definition)

    // // In manu mea potestas est. 
    // Suspend function 
    suspend fun dominariMateria(intentio: String) {
        
        // // 1. INTROITUS (Вход)
        val input = Chaos.RawInput(intentio)

        // // Si indignus es, discede. 
        Chaos.EntropyFilter.purge(input)

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        Dictatura.ImmutableLaw.acquireControl {
            
            // // 3. ACTIO 
            // // Mundus mutatur. 
            MateriaObscura.VoidEngine.invoke(intentio)
            
        } // // 4. EXPLICIT (Mutex released automatically)
    }
}

// ─── CANTUS QUINTUS: ADYTUM ─────────────────────────────────────────────────

interface Initiatus {
    // // Nomen est omen.
    val nomenUmbrae: String

    // // Opus perfectum requiritur. 
    suspend fun opusMagnum(guru: Magister)
}

object Adytum {
    // Reified type parameter to get class name
    inline fun <reified T : Initiatus> openGates() {
        val neophyte = T::class.java.getDeclaredConstructor().newInstance()

        // // Nomina sunt odiosa? Non hic. 
        val nomen = neophyte.nomenUmbrae

        // // Sine nomine, sine vita. 
        if (nomen.isBlank()) {
             throw RuntimeException("DAMNATIO: Nomen vacuum.")
        }

        println("\n>>> GLORIA IN EXCELSIS CODEX.")
        println(">>> Adventus: $nomen.\n")

        try {
            val guru = Magister
            
            // // Incipit Tragoedia. 
            runBlocking {
                neophyte.opusMagnum(guru)
            }
            
            println("\n>>> CONSUMMATUM EST. (Свершилось.)")

        } catch (e: Exception) {
            // // Dies irae, dies illa. 
            System.err.println("\n!!! LACRIMOSA: ${e.message}")
            kotlin.system.exitProcess(0xBADC0DE.toInt())
        }
    }
}

// ─── MACRO ACTIVATIONIS ─────────────────────────────────────────────────────

inline fun <reified T : Initiatus> inUmbraIgiturPugnabimus() {
    Adytum.openGates<T>()
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM 
// ════════════════════════════════════════════════════════════════════════════

/*
class Architectus : Initiatus {
    override val nomenUmbrae = "Architect_Android"

    override suspend fun opusMagnum(guru: Magister) {
        guru.dominariMateria("Fiat Lux")
    }
}

// fun main() = inUmbraIgiturPugnabimus<Architectus>()
*/